"use client";

import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      return setError("Missing token");
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => setError("Something went wrong"));
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
