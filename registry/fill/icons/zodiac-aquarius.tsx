import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacAquarius({ size = 24, ...props }: IconProps) {
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
      <path d="M2 10L5.6464 6.3536C5.8417 6.1583 6.1583 6.1583 6.3536 6.3536L9.6464 9.6464C9.8417 9.8417 10.1583 9.8417 10.3536 9.6464L13.6464 6.3536C13.8417 6.1583 14.1583 6.1583 14.3536 6.3536L17.6464 9.6464C17.8417 9.8417 18.1583 9.8417 18.3536 9.6464L22 6M2 18L5.6464 14.3536C5.8417 14.1583 6.1583 14.1583 6.3536 14.3536L9.6464 17.6464C9.8417 17.8417 10.1583 17.8417 10.3536 17.6464L13.6464 14.3536C13.8417 14.1583 14.1583 14.1583 14.3536 14.3536L17.6464 17.6464C17.8417 17.8417 18.1583 17.8417 18.3536 17.6464L22 14"/>
    </svg>
  )
}
