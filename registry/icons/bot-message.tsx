import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotMessage({ size = 24, ...props }: IconProps) {
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
      <path d="M4.5686 16.353 C2.915 14.8839 2 12.9769 2 11 C2 6.5817 6.4772 3 12 3 C17.5228 3 22 6.5817 22 11 C22 15.4183 17.5228 19 12 19 C11.1845 19 10.3721 18.9202 9.5808 18.7624 L5 21 L4.5686 16.353 Z"/>
      <path d="M11 8.6028L11.4521 11.5685M14.9543 8L15.4064 10.9657"/>
    </svg>
  )
}
