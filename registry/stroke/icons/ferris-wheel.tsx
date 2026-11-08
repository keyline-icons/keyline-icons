import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FerrisWheel({ size = 24, ...props }: IconProps) {
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
      <path d="M9 22L11.5318 15.25C11.6941 14.82 12.3059 14.82 12.4682 15.25L15 22M9 22H7M9 22H15M15 22H17M18 17.38C19.2447 15.96 20 14.09 20 12.05C20 7.61 16.4183 4 12 4C7.5817 4 4 7.61 4 12.05C4 14.09 4.7553 15.96 6 17.38M12 2V6M21 6.8L17.1962 9M6.8038 15L3 17.2M3 6.8L6.8038 9M17.1962 15L18.9282 16L21 17.2M12 14C10.8954 14 10 13.1 10 12C10 10.9 10.8954 10 12 10C13.1046 10 14 10.9 14 12C14 13.1 13.1046 14 12 14Z"/>
    </svg>
  )
}
