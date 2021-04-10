<?php

namespace App\Http\Controllers;

use App\Enums\eRespCode;
use App\Http\Requests\companies\CreateOrUpdateCompany;
use App\Http\Resources\Companies\Base\CompaniesResources;
use App\Http\Resources\Companies\Pagination\CompaniesPaginationResourceCollection;
use App\Models\Company;

class CompanyController extends ResponseController
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
        $companies = Company::paginate();

        return $this->resp->ok(eRespCode::C_LISTED_200_00, new CompaniesPaginationResourceCollection($companies));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateOrUpdateCompany $request)
    {
        if ($company = Company::create($request->only(['name', 'email', 'webSite'])))
            return $this->resp->created(eRespCode::C_CREATED_201_00, new CompaniesResources($company));
        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Company $Company
     * @return \Illuminate\Http\Response
     */
    public function update(CreateOrUpdateCompany $request, Company $company)
    {
        if ($company->update($request->only(['name', 'email', 'webSite'])))
            return $this->resp->ok(eRespCode::C_UPDATED_200_01, new CompaniesResources($company));

        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $Company)
    {
        if ($Company->delete())
            return $this->resp->ok(eRespCode::C_DELETED_200_02);


        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }
}
