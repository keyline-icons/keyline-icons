import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PackageX({ size = 24, ...props }: IconProps) {
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
      <path d="M22 6.8477L22 13L16 13L13 13L13 22L12 22L2 17.1523L2 6.8477L12 12L22 6.8477Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 6.8477L12 12M12 12L22 6.8477M7 4.4239L17 9.4239M12 12L12 22L2 17.1523L2 6.8477L12 2L22 6.8477L22 13M15.7071 15.7071L22.2929 22.2929M22.2929 15.7071L15.7071 22.2929"/>
    </svg>
  )
}
