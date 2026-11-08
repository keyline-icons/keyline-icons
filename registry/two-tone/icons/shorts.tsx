import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shorts({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 7.8906L22.943 16.8593C22.9452 16.8693 22.947 16.8793 22.9489 16.8893C23.2695 18.629 22.0408 20.2388 20.3067 20.4488L16.0153 20.9787C14.4895 21.1587 13.0398 20.1988 12.6584 18.709L12.0013 16.1194L11.3441 18.709C10.9627 20.1988 9.513 21.1587 7.9872 20.9787L3.6958 20.4488C1.9618 20.2388 0.7359 18.609 1.0566 16.8793L3.0026 7.8906V6.0009C3.0026 4.3411 4.3455 3.0013 6.0022 3.0013H18.0004C19.6571 3.0013 21 4.3411 21 6.0009V7.8906Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.0012 8.0006V6.0009C4.0012 4.901 4.8964 4.0012 6.0009 4.0012H17.9991C19.1036 4.0012 19.9988 4.901 19.9988 6.0009V8.0006M4.0012 8.0006L2.0352 17.0693C1.8226 18.2191 2.6363 19.3089 3.8163 19.4589L8.1076 19.9789C9.147 20.1088 10.1198 19.4589 10.3738 18.4591L11.4976 14.0397C11.6285 13.5298 12.3715 13.5298 12.5024 14.0397L13.6262 18.4591C13.8802 19.4589 14.853 20.1088 15.8924 19.9789L20.1837 19.4589C21.3637 19.3089 22.1774 18.2191 21.9648 17.0693L19.9988 8.0006M4.0012 8.0006H8.0006M19.9988 8.0006H15.9994"/>
    </svg>
  )
}
