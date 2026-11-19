import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Solar({ size = 24, ...props }: IconProps) {
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
      <path d="M12 23L4.0036 23C2.7693 23 1.7931 22.2866 1.3207 21.3423C0.8483 20.398 0.8627 19.189 1.6028 18.2012L4.5997 14.2012C5.1663 13.445 6.0559 13 7.0006 13L16.9994 13C17.9441 13 18.8337 13.445 19.4003 14.2012L22.3972 18.2012C23.1373 19.189 23.1517 20.398 22.6793 21.3423C22.2069 22.2866 21.2307 23 19.9964 23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7.221 21L4.0036 21C3.5903 21 3.2723 20.7731 3.1093 20.4475C2.9464 20.1218 2.9555 19.7312 3.2034 19.4004L3.5034 19L7.7205 19ZM5.0018 17L6.2003 15.4004C6.3891 15.1484 6.6857 15 7.0006 15L8.7195 15L8.22 17ZM10.781 15L13.219 15L13.7185 17L10.2815 17ZM15.2805 15L16.9994 15C17.3143 15 17.6109 15.1484 17.7997 15.4004L18.9982 17L15.78 17ZM20.4966 19L20.7966 19.4004C21.0445 19.7312 21.0536 20.1218 20.8907 20.4475C20.7277 20.7731 20.4097 21 19.9964 21L16.779 21L16.2795 19ZM14.7175 21L12 21L9.2825 21L9.782 19L14.218 19Z" fill="currentColor" stroke="none"/>
      <path d="M7.9689 10C8.7286 8.4686 10.2905 7.5 12 7.5C13.7095 7.5 15.2714 8.4686 16.0311 10M12 3.5L12 2M18.0104 5.9896L19.0711 4.9289M5.9896 5.9896L4.9289 4.9289M3.9689 10H2.4689M20.0311 10H21.5311"/>
    </svg>
  )
}
