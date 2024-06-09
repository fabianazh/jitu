<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih dari Jitu!</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #0066cc;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Terima Kasih atas Kritik & Saran Anda, {{ $name }}!</h1>
        <p>Kami menghargai waktu Anda untuk memberikan masukan kepada kami. Kritik dan saran Anda membantu kami untuk terus meningkatkan pelayanan kami.</p>
        <p>Jangan ragu untuk memberikan masukan lebih lanjut atau menghubungi kami jika Anda membutuhkan bantuan lebih lanjut.</p>
        <p>Terima kasih lagi dan semoga harimu menyenangkan!</p>

        <div class="footer">
            <p>Terima Kasih,<br>{{ config('app.name') }}</p>
        </div>
    </div>

</body>
</html>
