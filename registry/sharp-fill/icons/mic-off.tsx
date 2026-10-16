import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MicOff({ size = 24, ...props }: IconProps) {
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
      <path d="M12 15C9.7909 15 8 13.2091 8 11L8 8L14.2841 14.2841C13.6365 14.7354 12.8492 15 12 15ZM8.1508 3.9081C8.626 2.2297 10.1694 1 12 1C14.2091 1 16 2.7909 16 5L16 11C16 11.2377 15.9793 11.4705 15.9395 11.6968Z" fill="currentColor" stroke="none"/>
      <path d="M16.4246 16.4246C15.2187 17.4094 13.6783 18 12 18C8.134 18 5 14.866 5 11L5 10M12 18L12 22M7 22L17 22M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
