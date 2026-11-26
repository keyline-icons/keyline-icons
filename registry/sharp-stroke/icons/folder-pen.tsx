import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderPen({ size = 24, ...props }: IconProps) {
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
      <path d="M9.3842 20L3 20L3 4L9.5 4L12 6.5L21 6.5L21 8.5617M20.4142 14.6329L16.1715 18.8755L12.2189 19.9998L13.3431 16.0471L17.5858 11.8044C17.9609 11.4294 18.4696 11.2186 19 11.2186C20.1046 11.2186 21 12.1141 21 13.2186C21 13.7491 20.7893 14.2578 20.4142 14.6329Z"/>
    </svg>
  )
}
