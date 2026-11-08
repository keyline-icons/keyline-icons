import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stethoscope({ size = 24, ...props }: IconProps) {
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
      <path d="M6.0027 3.0015H4.2091C3.3744 3.0015 2.6114 3.4714 2.2382 4.2213C1.9871 4.7212 1.9372 5.3011 2.0984 5.841L3.8536 11.1701C4.5357 13.4398 6.6285 14.9995 9.0022 14.9995M6.0027 3.0015V2.0016M6.0027 3.0015V4.0013M9.0022 14.9995C11.3759 14.9995 13.4687 13.4398 14.1507 11.1701L15.75 5.841C15.9113 5.3011 15.8613 4.7212 15.6102 4.2213C15.237 3.4714 14.474 3.0015 13.6393 3.0015H12.0017M9.0022 14.9995V16.4993C9.0022 19.5388 11.4642 21.9984 14.5013 21.9984C17.5384 21.9984 20.0004 19.5388 20.0004 16.4993V15.9993M12.0017 3.0015V2.0016M12.0017 3.0015V4.0013M20.0004 15.9993C18.896 15.9993 18.0007 15.0995 18.0007 13.9997C18.0007 12.8999 18.896 12 20.0004 12C21.1048 12 22.0001 12.8999 22.0001 13.9997C22.0001 15.0995 21.1048 15.9993 20.0004 15.9993Z"/>
    </svg>
  )
}
