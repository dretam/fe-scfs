import * as React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {ControllerRenderProps} from "react-hook-form";


export default function InputPassword({placeholder, disabled, ...field}: Readonly<{
	placeholder: string;
	disabled: boolean;
}> & ControllerRenderProps): React.ReactElement {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				{...field}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="cursor-pointer absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
				onClick={() => setShowPassword((prev) => !prev)}
				disabled={disabled}
			>
				{showPassword ? (
					<EyeIcon className="h-4 w-4" aria-hidden="true"/>
				) : (
					<EyeOffIcon className="h-4 w-4" aria-hidden="true"/>
				)}
				<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
			</Button>
		</div>
	)
}
