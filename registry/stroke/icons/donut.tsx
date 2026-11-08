import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Donut({ size = 24, ...props }: IconProps) {
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
      <path d="M9.95 17.64L8.91 17.14M6 11V13M17.7 10.7L18 11.1M5.5 4.5C6 5 7 6.25 9 6.25C12.5355 6.25 14 5.25 16 5.75C17.6 6.15 18.6667 5.45 19 5M12 14C10.8954 14 10 13.1 10 12C10 10.9 10.8954 10 12 10C13.1046 10 14 10.9 14 12C14 13.1 13.1046 14 12 14ZM21.8589 13.67C21.7773 14.15 21.3607 14.51 20.873 14.51C20.8527 14.51 20.8325 14.51 20.8122 14.5C20.7616 14.5 20.7109 14.5 20.6603 14.5C19.2795 14.5 18.1603 15.62 18.1603 17C18.1603 17.21 18.1875 17.43 18.2413 17.63C18.252 17.67 18.2575 17.71 18.2575 17.76C18.2575 18.03 18.0336 18.26 17.7575 18.26C17.7149 18.26 17.6724 18.25 17.6312 18.24C17.4251 18.19 17.213 18.16 17 18.16C15.6193 18.16 14.5 19.28 14.5 20.66C14.5 20.71 14.5015 20.76 14.5046 20.81C14.5059 20.83 14.5065 20.85 14.5065 20.87C14.5065 21.36 14.1547 21.78 13.6739 21.86C13.1209 21.95 12.5609 22 12 22C6.4772 22 2 17.52 2 12C2 6.48 6.4772 2 12 2C17.5228 2 22 6.48 22 12C22 12.56 21.9528 13.12 21.8589 13.67Z"/>
    </svg>
  )
}
