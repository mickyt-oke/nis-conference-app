<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RegistrationController extends Controller
{
    /**
     * Store a new registration in the database.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate request data
        $validated = $request->validate($this->getValidationRules($request->input('registrationType')), [
            'firstName.required' => 'First name is required.',
            'lastName.required' => 'Last name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Email must be a valid email address.',
            'email.unique' => 'This email is already registered.',
            'phone.required' => 'Phone number is required.',
            'conference.required' => 'Please select a conference.',
            'registrationType.required' => 'Registration type is required.',
            'biography.required_if' => 'Biography is required for speakers.',
            'presentationTitle.required_if' => 'Presentation title is required for speakers.',
            'presentationAbstract.required_if' => 'Presentation abstract is required for speakers.',
            'staffId.required_if' => 'Staff ID is required for team members.',
            'department.required_if' => 'Department is required for team members.',
            'supervisorName.required_if' => 'Supervisor name is required for team members.',
            'supervisorEmail.required_if' => 'Supervisor email is required for team members.',
            'justification.required_if' => 'Attendance justification is required for team members.',
        ]);

        try {
            // Generate unique registration ID
            $registrationId = 'NIS-' . time() . '-' . strtoupper(substr(md5(uniqid()), 0, 8));

            // Create registration
            $registration = Registration::create([
                'registration_id' => $registrationId,
                'registration_type' => $validated['registrationType'],
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'organization' => $validated['organization'] ?? null,
                'job_title' => $validated['jobTitle'] ?? null,
                'conference_id' => $validated['conference'],
                'status' => $validated['registrationType'] === 'team' ? 'pending_approval' : 'confirmed',
                'additional_data' => $this->getAdditionalData($validated),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registration submitted successfully.',
                'registrationId' => $registrationId,
                'registration' => $registration,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to process registration: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get validation rules based on registration type.
     *
     * @param string $type
     * @return array
     */
    private function getValidationRules(string $type): array
    {
        $baseRules = [
            'registrationType' => ['required', Rule::in(['attendee', 'speaker', 'team'])],
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'organization' => ['nullable', 'string', 'max:255'],
            'jobTitle' => ['nullable', 'string', 'max:255'],
            'conference' => ['required', 'string', 'max:255'],
        ];

        if ($type === 'speaker') {
            $baseRules = array_merge($baseRules, [
                'biography' => ['required', 'string', 'max:1000'],
                'presentationTitle' => ['required', 'string', 'max:255'],
                'presentationAbstract' => ['required', 'string', 'max:1000'],
                'expertise' => ['nullable', 'string', 'max:500'],
                'experience' => ['nullable', 'string', 'max:500'],
            ]);
        }

        if ($type === 'team') {
            $baseRules = array_merge($baseRules, [
                'staffId' => ['required', 'string', 'max:50'],
                'department' => ['required', 'string', 'max:255'],
                'gradeLevel' => ['nullable', 'string', 'max:50'],
                'supervisorName' => ['required', 'string', 'max:100'],
                'supervisorEmail' => ['required', 'email', 'max:255'],
                'justification' => ['required', 'string', 'max:1000'],
            ]);
        }

        if ($type === 'attendee') {
            $baseRules = array_merge($baseRules, [
                'dietary' => ['nullable', 'string', 'max:500'],
            ]);
        }

        return $baseRules;
    }

    /**
     * Extract and format additional data based on registration type.
     *
     * @param array $validated
     * @return array
     */
    private function getAdditionalData(array $validated): array
    {
        $additionalData = [];

        if ($validated['registrationType'] === 'speaker') {
            $additionalData = [
                'biography' => $validated['biography'] ?? null,
                'presentationTitle' => $validated['presentationTitle'] ?? null,
                'presentationAbstract' => $validated['presentationAbstract'] ?? null,
                'expertise' => $validated['expertise'] ?? null,
                'experience' => $validated['experience'] ?? null,
            ];
        }

        if ($validated['registrationType'] === 'team') {
            $additionalData = [
                'staffId' => $validated['staffId'] ?? null,
                'department' => $validated['department'] ?? null,
                'gradeLevel' => $validated['gradeLevel'] ?? null,
                'supervisorName' => $validated['supervisorName'] ?? null,
                'supervisorEmail' => $validated['supervisorEmail'] ?? null,
                'justification' => $validated['justification'] ?? null,
            ];
        }

        if ($validated['registrationType'] === 'attendee') {
            $additionalData = [
                'dietary' => $validated['dietary'] ?? null,
            ];
        }

        return $additionalData;
    }
}
