import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M12.999 1V15.802L18.58 10.123L20.006 11.524L12.712 18.946C12.524 19.138 12.267 19.246 11.999 19.246C11.731 19.246 11.474 19.138 11.286 18.946L3.992 11.524L5.418 10.123L10.999 15.802V1H12.999Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M20 21V23H4V21H20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
