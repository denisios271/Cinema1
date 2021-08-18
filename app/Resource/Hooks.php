<?php

namespace App\Resource;

trait Hooks
{
    /**
     * Hook triggered after succesfully getting object.
     *
     * @return void
     */
    protected function beforeSending()
    {
    }

    /**
     * Hook triggered before inserting data into DB
     *
     * @return void
     */
    protected function beforeInserting()
    {
    }

    /**
     * Hook triggered after inserting data into DB
     *
     * @return void
     */
    protected function afterInserting()
    {
    }

    /**
     * Hook triggered before updating data into DB
     *
     * @return void
     */
    protected function beforeUpdating()
    {
    }

    /**
     * Hook triggered after updating data into DB
     *
     * @return void
     */
    protected function afterUpdating()
    {
    }

    /**
     * Hook triggered before removing data from DB
     *
     * @return void
     */
    protected function beforeRemoving()
    {
    }

    /**
     * Hook triggered after removing data from DB
     *
     * @return void
     */
    protected function afterRemoving()
    {
    }

    /**
     * Hook triggered after accepting resource for inserting in the DB
     *
     * @return void
     */
    protected function afterInsertAccepting()
    {
    }
}
