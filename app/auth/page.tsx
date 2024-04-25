import FormClient from "@/components/form-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-center font-bold text-4xl">LOGO HERE</h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full mb-10 bg-secondary">
          <TabsTrigger className="w-full" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-full" value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent className="h-[300px] rounded-md" value="login">
          <FormClient name="login" />
        </TabsContent>
        <TabsContent className="h-[300px] rounded-md" value="register">
          <FormClient name="register" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
