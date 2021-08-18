<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Symfony\Component\Finder\SplFileInfo;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\json_encode;

/**
 * TODO: disable access at the VPS (mb add checking env var?)
 */
class GenerateInterfaces extends Controller
{
    /**
     * Converts filename with the relative path (relative to app folder) to the namespace format
     *
     * @param SplFileInfo $file
     * @return string
     */
    protected function fromSplFileInfoToClassName(SplFileInfo $file): string
    {
        $className = "App/{$file->getRelativePathname()}";
        $className = str_replace([
            '/',
            ".php",
        ], [
            '\\',
            '',
        ], $className);
        return $className;
    }

    /**
     * Returns list of the all models (in SplFileInfo objects)
     *
     * @return array of SplFileInfo
     */
    protected function getModels(): array
    {
        $path = app_path();
        $files = File::allFiles($path);

        return array_map(function (SplFileInfo $file) {
            return $this->fromSplFileInfoToClassName($file);
        }, array_filter($files, function (SplFileInfo $file) {
            $className = $this->fromSplFileInfoToClassName($file);
            if (is_subclass_of($className, 'Illuminate\Database\Eloquent\Model')) {
                return true;
            }
            return false;
        }));
    }

    /**
     * Returns columns for selected table's name
     *
     * @param string $tableName
     * @return stdObject[]
     * * Field (string)
     * * Type (string)
     * * Null ("NO"/"YES")
     * * Key (string)
     * * Default (mixed)
     * * Extra (string)
     */
    protected function getColumnsByTableName(string $tableName): array
    {
        return DB::select(DB::raw("SHOW COLUMNS FROM {$tableName}"));
    }

    /**
     * WIll try to convert SQL types into 'number' and 'string' for TypeScript.
     * Also will try to append at the end '|null' if field can be null without default param.
     *
     * @param stdObject $column See description in the 'getColumnsByTableName' method
     * @return string
     */
    protected function encodeFieldType($column): string
    {
        $field = preg_replace('/^([^(\s]+)(.*)$/', '$1', $column->Type);
        $postfix = '';

        // change 'int' to 'number' e.t.c.
        $replacers = [
            'number' => [
                'integer', 'int', 'smallint', 'tinyint', 'mediumint', 'bigint',
                'decimal', 'numeric', 'float', 'double', 'bit', 'year',
            ],
            'string' => [
                'char', 'varchar', 'binary', 'varbinary', 'tinyblob', 'blob',
                'mediumblob', 'longblob', 'tinytext', 'text', 'mediumtext', 'longtext',
                'date', 'datetime', 'timestamp', 'time',
            ],
        ];
        foreach ($replacers as $replaceWith => $searchArray) {
            if (in_array(strtolower($field), $searchArray)) {
                $field = $replaceWith;
                break;
            }
        }
        
        // add postfix
        if ($column->Null != 'NO') {
            if ($column->Default == null || $column->Default == '') {
                if ($column->Field != 'created_at' && $column->Field != 'updated_at') {
                    $postfix = '|null';
                }
            }
        }
        return $field . $postfix;
    }

    /**
     * Encodes name to the format iModalName
     *
     * @param string $modelName
     * @return string
     */
    protected function encodeInterfaceName(string $modelName): string
    {
        $parts = explode('\\', $modelName);
        $modelName = $parts[count($parts) - 1];
        $modelName = explode('_', $modelName);
        foreach ($modelName as $key => $value) {
            $modelName[$key] = ucfirst($value);
        }
        $modelName = implode($modelName);
        return "i{$modelName}";
    }

    /**
     * Entry point
     */
    public function generate()
    {
        $resultInterfaces = [];
        foreach ($this->getModels() as $modelName) {
            $resultInterfaces[$this->encodeInterfaceName($modelName)] = [];
            $model = new $modelName;
            foreach ($this->getColumnsByTableName($model->getTable()) as $col) {
                $resultInterfaces[$this->encodeInterfaceName($modelName)][$col->Field] = $this->encodeFieldType($col);
            }
        }
        return $resultInterfaces;
    }
}
