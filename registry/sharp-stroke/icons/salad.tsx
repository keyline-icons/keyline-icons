import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Salad({ size = 24, ...props }: IconProps) {
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
      <path d="M3 13H2C3.052 17.68 7.206 21 12 21M3 13H9M3 13C3 11.34 4.343 10 6 10C7.657 10 9 11.34 9 13M12 21C16.794 21 20.948 17.68 22 13H18.2M12 21H4M12 21H20M9 13H13.203M18.2 13C18.402 12.82 18.595 12.63 18.78 12.43C19.858 11.27 20.582 9.82 20.866 8.26C21.149 6.7 20.981 5.09 20.381 3.62C20.29 3.4 20.12 3.21 19.903 3.11C19.686 3 19.437 2.97 19.203 3.03C17.668 3.43 16.279 4.26 15.201 5.43C14.122 6.59 13.399 8.04 13.115 9.6C12.909 10.73 12.941 11.89 13.203 13M18.2 13H14.956M13.203 13H14.956M14.956 13L17.915 7.08M16.216 4.5L15.755 4.32C13.5 3.4 10.9 3.9 10.2 6.9C8.9 6 6.029 5.87 5 9.73L4.869 10.22"/>
    </svg>
  )
}
