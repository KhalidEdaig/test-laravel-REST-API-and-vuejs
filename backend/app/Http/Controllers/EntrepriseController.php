<?php

namespace App\Http\Controllers;

use App\Http\Requests\entreprice\CreateOrUpdateEntreprise;
use App\Models\Entreprise;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entreprises = Entreprise::all();
        return \response()->json(
            [
                'status' => 200,
                'message' => 'entreprises successfully listed',
                'entreprises' => $entreprises
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateEntreprise $request)
    {
        if ($entreprise = Entreprise::create($request->only(['name', 'email', 'webSite']))) {
            return \response()->json(
                [
                    'status' => 201,
                    'message' => 'entreprise successfully listed',
                    'entreprise' => $entreprise
                ]
            );
        } else {
            return \response()->json(
                [
                    'status' => 500,
                    'message' => 'something has gone wrong',
                ]
            );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Entreprise $entreprise
     * @return \Illuminate\Http\Response
     */
    public function update(CreateOrUpdateEntreprise $request, Entreprise $entreprise)
    {
        if ($entreprise->update($request->only(['name', 'email', 'webSite']))) {
            return \response()->json(
                [
                    'status' => 200,
                    'message' => 'entreprise successfully updated',
                    'entreprise' => $entreprise
                ]
            );
        } else {
            return \response()->json(
                [
                    'status' => 500,
                    'message' => 'something has gone wrong',
                ]
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entreprise $entreprise)
    {
        if ($entreprise->delete()) {
            return \response()->json(
                [
                    'status' => 200,
                    'message' => 'entreprise successfully deleted',
                ]
            );
        } else {
            return \response()->json(
                [
                    'status' => 500,
                    'message' => 'something has gone wrong',
                ]
            );
        }
    }
}
