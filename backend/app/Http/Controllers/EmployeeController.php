<?php

namespace App\Http\Controllers;

use App\Http\Requests\employees\CreateOrUpdateEmployee;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();
        return \response()->json(
            [
                'status' => 200,
                'message' => 'employees successfully listed',
                'employees' => $employees
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateEmployee $request)
    {
        if ($employee = Employee::create($request->all())) {
            return \response()->json(
                [
                    'status' => 201,
                    'message' => 'employee successfully created',
                    'employee' => $employee
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(CreateOrUpdateEmployee $request, Employee $employee)
    {
        if ($employee->update($request->all())) {
            return \response()->json(
                [
                    'status' => 200,
                    'message' => 'employee successfully updated',
                    'employee' => $employee
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
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        if ($employee->delete()) {
            return \response()->json(
                [
                    'status' => 200,
                    'message' => 'employee successfully deleted',

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
