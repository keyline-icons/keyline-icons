import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Parallelogram({ size = 24, ...props }: IconProps) {
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
      <path d="M13.5623 3L18.9977 3C21.696 3 23.6201 5.6173 22.8152 8.1931L19.6906 18.1931C19.1687 19.8631 17.6224 21 15.8731 21L5.0023 21C2.304 21 0.3799 18.3827 1.1848 15.8069L4.3094 5.8069C4.8313 4.1369 6.3776 3 8.1269 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5.2631 6.1052C5.6545 4.8527 6.8144 4 8.1265 4L18.9985 4C21.0224 4 22.4656 5.963 21.8619 7.8948L18.7369 17.8948C18.3455 19.1473 17.1856 20 15.8735 20L5.0015 20C2.9776 20 1.5344 18.037 2.1381 16.1052Z"/>
    </svg>
  )
}
