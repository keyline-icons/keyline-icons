import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SolarPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16L5.0037 16C3.5316 16 2.3073 15.226 1.6177 14.1296C0.9281 13.0332 0.7607 11.5945 1.3984 10.2676L4.2815 4.2676C4.9475 2.8815 6.3491 2 7.8868 2L16.1132 2C17.6509 2 19.0525 2.8815 19.7186 4.2676L22.6016 10.2676C23.2393 11.5945 23.0719 13.0332 22.3823 14.1296C21.6927 15.226 20.4684 16 18.9963 16ZM9.2508 14L9.8915 10L14.1085 10L14.7492 14L16.7747 14L16.134 10L20.2542 10L19.2931 8L15.8136 8L15.1729 4L13.1474 4L13.7881 8L10.2119 8L10.8526 4L8.8271 4L8.1864 8L4.7068 8L3.7458 10L7.866 10L7.2253 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 15V21M8 21H16"/>
    </svg>
  )
}
