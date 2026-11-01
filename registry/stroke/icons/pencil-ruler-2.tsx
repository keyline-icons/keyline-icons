import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PencilRuler2({ size = 24, ...props }: IconProps) {
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
      <path d="M8.6834 5.9833L16.5003 13.8001L22 16L19.8001 10.5003L11.9833 2.6834C11.5456 2.2458 10.9522 2 10.3333 2C9.7145 2 9.121 2.2458 8.6834 2.6834C8.2458 3.121 8 3.7145 8 4.3333C8 4.9522 8.2458 5.5456 8.6834 5.9833ZM12.8553 3.5555L9.5555 6.8553M7.2761 10.5108L4.1339 7.3686C3.3464 6.5812 2 7.1389 2 8.2525L2 20C2 21.1046 2.8954 22 4 22L15.7475 22C16.8611 22 17.4188 20.6536 16.6314 19.8661L12.9329 16.1676M12.9329 16.1676L10.1045 13.3392L7.2761 10.5108M7.2761 10.5108L5.2574 12.5294M12.9329 16.1676L10.9142 18.1863M10.1045 13.3392L8.0858 15.3579" fill="none"/>
    </svg>
  )
}
