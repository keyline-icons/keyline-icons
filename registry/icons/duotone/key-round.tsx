import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyRound({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2929 13.7929L1.5858 17.5C1.2107 17.8751 1 18.3838 1 18.9142L1 20C1 21.6569 2.3431 23 4 23L5.0858 23C5.6162 23 6.1249 22.7893 6.5 22.4142L7.4142 21.5L9 21.5C9.8284 21.5 10.5 20.8284 10.5 20L10.5 19L11.5 19C12.3284 19 13 18.3284 13 17.5L13 15.9142L14.1603 14.7539C14.7599 14.9172 15.3786 15 16 15C19.866 15 23 11.866 23 8C23 4.134 19.866 1 16 1C12.134 1 9 4.134 9 8C9 8.6214 9.0828 9.2401 9.2461 9.8397L5.2929 13.7929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 9L17 7"/>
    </svg>
  )
}
