<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Admin;
use App\Models\ViolationCategory;
use App\Notifications\MessageFromGuest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing/Home');
    }

    public function about()
    {
        return Inertia::render('Landing/About');
    }


    public function rules()
    {
        $categories = ViolationCategory::all()->map(function (ViolationCategory $category) {
            return $category->getDetailData();
        });

        return Inertia::render('Landing/Rules', [
            'categories' => $categories
        ]);
    }


    public function contact()
    {
        return Inertia::render('Landing/Contact');
    }

    public function submitMessage(StoreMessageRequest $request)
    {
        $validatedData = $request->validated();

        $admin = Admin::find(213);

        $admin->notify(new MessageFromGuest('Pesan dari ' . $validatedData['name'], $validatedData['name'], $validatedData['email'], $validatedData['message']));

        Mail::to($validatedData['email'])->send(new SendEmail($validatedData));

        return Redirect::route('landing.contact')->with('success', 'Pesan berhasil dikirim.');
    }
}
