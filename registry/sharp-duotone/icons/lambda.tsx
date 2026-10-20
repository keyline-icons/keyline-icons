import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lambda({ size = 24, ...props }: IconProps) {
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
      <path d="M4.9767 6.5L4.9767 5.5C4.9767 4.1193 6.096 3 7.4767 3C8.6115 3 9.604 3.7644 9.8938 4.8616L13.1987 17.3749C13.9329 20.1546 17.7787 20.4095 18.8733 17.7511L19.2317 16.8808M11.515 11L4.6807 21.4528" fill="none"/>
    </svg>
  )
}
