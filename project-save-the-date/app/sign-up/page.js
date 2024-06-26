import "./sign-up.css";
import SignUpForm from "@/components/sign-up-form/sign-up-form";
import Info from "@/components/info/info";

export default function SignUp() {
  return (
    <>
      <div className="sign-up-page-container">
        <Info
          title="Becky & Gerrone"
          date=" Monday 24th June 2024"
          text="If more than one person from your household has received a save-the-date, you can respond on their behalf by choosing to 'Add A Guest'"
        />
        <SignUpForm />
      </div>
    </>
  );
}
