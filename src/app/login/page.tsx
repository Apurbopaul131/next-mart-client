import LoginForm from "@/components/modules/auth/login/LoginForm";

const LoginPage = () => {
  console.log("login page");
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;
