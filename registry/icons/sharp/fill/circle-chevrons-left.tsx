import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleChevronsLeft({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM10.3358 7.5001L6.543 11.293C6.1524 11.6835 6.1524 12.3165 6.543 12.707L10.3359 16.4998L11.7499 15.0858L8.6641 12L11.7498 8.9141L10.3358 7.5001ZM16.3358 7.5001L12.543 11.293C12.1524 11.6835 12.1524 12.3165 12.543 12.707L16.3358 16.4998L17.7498 15.0858L14.6641 12L17.7498 8.9141L16.3358 7.5001Z" fill="currentColor"/>
    </svg>
  )
}
