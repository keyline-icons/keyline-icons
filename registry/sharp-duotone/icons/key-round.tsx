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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5.2929 13.7929L1.2929 17.7929C1.1054 17.9804 1 18.2348 1 18.5L1 22C1 22.5523 1.4477 23 2 23L5.5 23C5.7652 23 6.0196 22.8946 6.2071 22.7071L7.4142 21.5L9.5 21.5C10.0523 21.5 10.5 21.0523 10.5 20.5L10.5 19L12 19C12.5523 19 13 18.5523 13 18L13 15.9142L14.1603 14.7539C14.7599 14.9172 15.3786 15 16 15C19.866 15 23 11.866 23 8C23 4.134 19.866 1 16 1C12.134 1 9 4.134 9 8C9 8.6214 9.0828 9.2401 9.2461 9.8397L5.2929 13.7929Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.7071 9.2929L17.2929 6.7071"/>
    </svg>
  )
}
