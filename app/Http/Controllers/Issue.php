<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client;

class Issue extends Controller
{
    public function website(Request $request)
    {
        $result = $this->send($request, 'WebSite');
        return response()->json([], $result ? 201 : 500);
    }

    public function mobile(Request $request)
    {
        $result = $this->send($request, 'Mobile App');
        return response()->json([], $result ? 201 : 500);
    }

    public function send(Request $request, string $type)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $data['time'] = time();
        $data['date'] = date("d.m.Y h:i:s");
        $data['ip'] = $request->getClientIp();
        $data['agent'] = $request->userAgent();
        $data['userName'] = \Auth::check() ? '(' . \Auth::user()->id . ')' . \Auth::user()->name : 'Guest' ;
        
        return \Mail::send('emails.issue', $data, function ($message) use ($type) {
            $message->to('tokiseven3@gmail.com', 'TokiSeven')
                ->subject("FireDub Issue - {$type}");
        });
    }
}
