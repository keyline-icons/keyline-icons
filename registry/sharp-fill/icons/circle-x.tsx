import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleX({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C17.937 1 23 6.0629 23 12C23 17.937 17.937 23 12 23C6.0629 23 1 17.937 1 12C1 6.0629 6.0629 1 12 1ZM14.8443 7.6002L12 10.4445L9.1556 7.6003L7.6002 9.1557L10.4445 12L7.6003 14.8444L9.1557 16.3998L12 13.5555L14.8444 16.3997L16.3998 14.8443L13.5555 12L16.3997 9.1556L14.8443 7.6002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
