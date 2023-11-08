"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function GoogleRedirectionPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    axios
      .get(`https://www.gyartx.space/auth/google/redirect?code=${code}`)
      .then((res) => {
        Cookies.set("artx-token", res.data.token, { expires: 7 });
        location.href = "/";
      });
  }, []);
  return <></>;
}
