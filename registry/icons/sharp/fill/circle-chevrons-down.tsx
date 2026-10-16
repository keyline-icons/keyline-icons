import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleChevronsDown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM15.0858 12.2501L12 15.3359L8.9141 12.2502L7.5001 13.6642L11.293 17.457C11.6835 17.8475 12.3165 17.8475 12.707 17.457L16.4998 13.6641L15.0858 12.2501ZM15.0858 6.2501L12 9.3359L8.9141 6.2502L7.5001 7.6642L11.293 11.457C11.6835 11.8475 12.3165 11.8475 12.707 11.457L16.4998 7.6641L15.0858 6.2501Z" fill="currentColor"/>
    </svg>
  )
}
