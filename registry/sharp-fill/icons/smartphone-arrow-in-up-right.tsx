import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneArrowInUpRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3L5 21C5 21.5523 5.4477 22 6 22L10 22L10 13L19 13L19 3C19 2.4477 18.5523 2 18 2L6 2C5.4477 2 5 2.4477 5 3ZM14.5 7L9.5 7L9.5 5L14.5 5L14.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 13L19 2L5 2L5 22L10 22M12 16L19 16L19 23M13.7071 21.2929L18.8536 16.1464"/>
    </svg>
  )
}
