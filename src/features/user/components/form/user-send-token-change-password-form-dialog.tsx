"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendTokenChangePasswordUserSchema, UserSendTokenChangePasswordFormValues } from "../../schemas";
import { useDialog } from "@/hooks/ui/use-dialog";
import { toast } from "sonner";
import { sendTokenChangePass } from "../../service";

interface UserSendTokenChangePasswordFormDialogProps {
  resolve: (values?: UserSendTokenChangePasswordFormValues) => void;
}

export function UserSendTokenChangePasswordFormDialog({
  resolve,
}: UserSendTokenChangePasswordFormDialogProps) {
  const dialog = useDialog();

  const form = useForm<UserSendTokenChangePasswordFormValues>({
    resolver: zodResolver(sendTokenChangePasswordUserSchema),
    defaultValues: {
      email: ""
    },
  });

  const onSubmit = async (values: UserSendTokenChangePasswordFormValues): Promise<void> => {
    try {
      const { data } = await sendTokenChangePass(values);
      console.log(data);
      toast(`Email has been successfully sent to ${values?.email}`);
    } catch (error: any) {
      console.log(error);
      toast("Email has been successfully sent");
    }
    
    dialog.close();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Send Forgot Password Request */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold">Send Forgot Password Request</h3>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full sm:w-auto">Submit</Button>
      </form>
    </Form>
  );
}