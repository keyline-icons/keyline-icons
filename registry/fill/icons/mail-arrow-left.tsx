import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7C2 5.343 3.3432 4 5 4H19C20.6569 4 22 5.343 22 7L12.7071 11C12.2846 11.282 11.7154 11.282 11.2929 11L2 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 20H5C3.3432 20 2 18.657 2 17V7M2 7C2 5.343 3.3432 4 5 4H19C20.6569 4 22 5.343 22 7M2 7L11.2929 11C11.7154 11.282 12.2846 11.282 12.7071 11L22 7M22 7V10M22 17H16M19 20L16 17L19 14"/>
    </svg>
  )
}
