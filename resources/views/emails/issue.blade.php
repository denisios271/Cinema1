<!DOCTYPE html>
<html lang="en-US">

<head>
	<meta charset="utf-8">
</head>

<body>

    <h1>New issue created via website backend</h1>
    <h2>{{ $title }}</h2>
    <p>{{ $description }}</p>
    
    <hr />

    <h3>Time</h3>
    <ul>
        <li>Unix: {{ $time }}</li>
        <li>Server's time: {{ $date }}</li>
    </ul>
    
    <hr />

    <h3>User details</h3>
    <ul>
        <li>Ip: {{ $ip }}</li>
        <li>UserAgent: {{ $agent }}</li>
        <li>User: {{ $userName }}</li>
    </ul>

</body>

</html>