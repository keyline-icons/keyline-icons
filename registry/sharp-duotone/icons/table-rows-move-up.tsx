import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TableRowsMoveUp({ size = 24, ...props }: IconProps) {
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
      <path d="M6 4L3 4L3 13M21 13L21 4L18 4" strokeOpacity="0.4"/>
      <path d="M2 12L22 12L22 22C22 22.5523 21.5523 23 21 23L3 23C2.4477 23 2 22.5523 2 22Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 9L12 2M8.7071 5.2929L12 2L15.2929 5.2929"/>
    </svg>
  )
}
