import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlobeNetwork({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C16.142 2 19.5 5.358 19.5 9.5M12 2C7.858 2 4.5 5.358 4.5 9.5M12 2C13.667 4.25 14.5 6.875 14.5 9.5M12 2C10.333 4.25 9.5 6.875 9.5 9.5M19.5 9.5C19.5 13.642 16.142 17 12 17M19.5 9.5H14.5M12 17C7.858 17 4.5 13.642 4.5 9.5M12 17C13.667 14.75 14.5 12.125 14.5 9.5M12 17C10.333 14.75 9.5 12.125 9.5 9.5M4.5 9.5H9.5M9.5 9.5H14.5" strokeOpacity="0.4"/>
      <path d="M12 17V21.5M3 21.5H21"/>
      <path d="M12 20C12.828 20 13.5 20.672 13.5 21.5C13.5 22.328 12.828 23 12 23C11.172 23 10.5 22.328 10.5 21.5C10.5 20.672 11.172 20 12 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
