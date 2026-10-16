import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Subtitles({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3H19C21.20914 3 23 4.79086 23 7V17C23 19.20914 21.20914 21 19 21H5C2.79086 21 1 19.20914 1 17V7C1 4.79086 2.79086 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 10L8 10M12 10L18 10M6 14L12 14M16 14L18 14"/>
    </svg>
  )
}
