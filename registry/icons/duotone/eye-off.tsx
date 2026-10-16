import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EyeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9.17184 9.17188L9.04 9.31055C8.3951 10.0201 8.00001 10.9648 7.99996 12C8.00008 14.2091 9.79085 16 12 16C13.0353 16 13.9799 15.605 14.6894 14.96L14.8281 14.8281L18.75 18.75C16.8543 20.1721 14.5068 21 12 21C6.73834 21 2.17946 17.353 1.02437 12.2197C0.991875 12.0752 0.991875 11.9248 1.02437 11.7803C1.62911 9.09277 3.16682 6.81265 5.24996 5.25L9.17184 9.17188Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3C17.2616 3 21.8205 6.64698 22.9755 11.7803C23.0081 11.9248 23.0081 12.0752 22.9755 12.2197C22.6999 13.4446 22.2301 14.5859 21.6025 15.6133C21.3146 16.0846 20.6988 16.2332 20.2275 15.9453C19.7566 15.6574 19.608 15.0424 19.8955 14.5713C20.3733 13.789 20.7379 12.9247 20.9697 11.999C19.9409 7.89496 16.2504 5 12 5C11.3454 5.00001 10.7045 5.06841 10.0849 5.19922C9.54457 5.3133 9.01349 4.96809 8.89937 4.42773C8.78531 3.88755 9.1308 3.35751 9.67086 3.24316C10.4253 3.08385 11.2051 3.00001 12 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.414 13.4141L13.2714 13.543C12.9254 13.8288 12.4835 14 12 14C10.8954 14 10.0001 13.1045 9.99996 12C10 11.5169 10.1704 11.0746 10.456 10.7285L10.5859 10.5859L13.414 13.4141Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
