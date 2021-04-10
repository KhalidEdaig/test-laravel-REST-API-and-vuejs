<?php

namespace App\Http\Controllers;

use App\Enums\eRespCode;
use App\Http\Requests\employees\CreateOrUpdateEmployee;
use App\Http\Resources\Employees\Base\EmployeesResources;
use App\Http\Resources\Employees\Pagination\EmployeesPaginationResourceCollection;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends ResponseController
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::paginate();
        return $this->resp->ok(eRespCode::EMP_LISTED_200_00, new EmployeesPaginationResourceCollection($employees));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateEmployee $request)
    {
        if ($employee = Employee::create($request->all()))
            return $this->resp->created(eRespCode::EMP_CREATED_201_00, new EmployeesResources($employee));
        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
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
        if ($employee->update($request->all()))
            return $this->resp->ok(eRespCode::EMP_UPDATED_200_01, new EmployeesResources($employee));

        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        if ($employee->delete())
            return $this->resp->ok(eRespCode::EMP_DELETED_200_02);
        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }
}
