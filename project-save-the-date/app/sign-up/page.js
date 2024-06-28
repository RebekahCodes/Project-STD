import "./sign-up.css";
import SignUpForm from "@/components/sign-up-form/sign-up-form";
import Info from "@/components/info/info";

export default function SignUp() {
  return (
    <>
      <div className="sign-up-page-container">
        <Info
          title={process.env.NEXT_PUBLIC_NAMES}
          date={process.env.NEXT_PUBLIC_DATE}
          text={process.env.NEXT_PUBLIC_FORM_TEXT}
        />
        <SignUpForm />
      </div>
    </>
  );
}
