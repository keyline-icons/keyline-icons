import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7234 19.8057L5.4389 21.8985C4.8104 22.2055 4.0689 21.7889 4.0043 21.0924L3.6081 16.825C1.9807 15.2413 1 13.081 1 11C1 6.1011 6.1264 2 12 2C17.8736 2 23 6.1011 23 11C23 15.8989 17.8736 20 12 20C11.2503 20 10.4661 19.9328 9.7234 19.8057Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 7.0093L13.428 9.572L15.9907 11L13.428 12.428L12 14.9907L10.572 12.428L8.0093 11L10.572 9.572L12 7.0093Z"/>
    </svg>
  )
}
