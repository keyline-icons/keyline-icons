import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSearch({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.391 13.39L16.535 16.535M14.357 11.057C14.357 12.88 12.88 14.357 11.057 14.357C9.235 14.357 7.757 12.88 7.757 11.057C7.757 9.235 9.235 7.757 11.057 7.757C12.88 7.757 14.357 9.235 14.357 11.057Z"/>
    </svg>
  )
}
