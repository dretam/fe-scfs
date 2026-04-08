import { FormLogin } from "@/features/auth";
import CommonCompanyLogo from "@/components/common/company-logo";

export default function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<div className="flex items-center gap-2 font-medium">
						<CommonCompanyLogo href="/" width={50} height={50} />
						SCFS
					</div>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<FormLogin />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block">
				<img
					src="/svg/undraw/business-call.svg"
					alt="Image"
					className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 object-contain dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	)
}
