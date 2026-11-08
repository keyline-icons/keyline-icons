import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SteeringWheel({ size = 24, ...props }: IconProps) {
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
      <path d="M14.2222 21.44V20.33C14.2222 16.34 17.4557 13.11 21.4444 13.11M9.7778 21.44V20.33C9.7778 16.34 6.5443 13.11 2.5556 13.11M2.5556 9.78C5.7037 8.67 13.1111 7 21.4444 9.78M12 22C6.4771 22 2 17.52 2 12C2 6.48 6.4771 2 12 2C17.5229 2 22 6.48 22 12C22 17.52 17.5229 22 12 22ZM12 17.56C9.5454 17.56 7.5556 15.57 7.5556 13.11C7.5556 10.66 9.5454 8.67 12 8.67C14.4546 8.67 16.4444 10.66 16.4444 13.11C16.4444 15.57 14.4546 17.56 12 17.56Z"/>
    </svg>
  )
}
