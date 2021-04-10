<?php

namespace App\Http\Resources\Companies\Base;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CompaniesResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'webSite' => $this->webSite,
            'logo' => $this->logo,
            'employees' => $this->whenLoaded('employees'),
            'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
        ];
    }
}
