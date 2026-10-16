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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.17184 9.17188C8.44919 9.89458 8.00002 10.8959 7.99996 12C8.00008 14.2091 9.79085 16 12 16C13.1042 16 14.1054 15.5509 14.8281 14.8281L18.75 18.75C16.8543 20.1721 14.5068 21 12 21C6.73834 21 2.17946 17.353 1.02437 12.2197C0.991875 12.0752 0.991875 11.9248 1.02437 11.7803C1.62911 9.09277 3.16682 6.81265 5.24996 5.25L9.17184 9.17188Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3C17.2616 3.00004 21.8205 6.64699 22.9755 11.7803C23.0081 11.9248 23.0081 12.0752 22.9755 12.2197C22.6999 13.4446 22.2301 14.5859 21.6025 15.6133L20.9238 16.7246L19.2168 15.6816L19.8955 14.5713C20.3732 13.7893 20.7379 12.9254 20.9697 12C19.9412 7.89546 16.2507 5.00004 12 5C11.3451 5 10.704 5.06849 10.0869 5.19922L9.10543 5.40625L8.69332 3.44922L9.67379 3.24219C10.4263 3.08286 11.2056 3 12 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.414 13.4141C13.0512 13.7769 12.5525 14 12 14C10.8954 14 10.0001 13.1045 9.99996 12C10 11.4476 10.223 10.9489 10.5859 10.5859L13.414 13.4141Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70703 1.70709L22.2928 22.2929"/>
    </svg>
  )
}
