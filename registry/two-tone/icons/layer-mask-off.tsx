import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayerMaskOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6465 20.6465C20.1443 20.8736 19.5869 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 7C1 5.3778 1.9657 3.9812 3.3535 3.3535ZM9.6569 3L19 3C21.2091 3 23 4.7909 23 7L23 16.3431L22.98 16.3431C22.9802 16.8844 22.5415 17.3233 22.0002 17.3233C21.7402 17.3233 21.4908 17.22 21.3071 17.0361L21.2929 17.0503L8.9497 4.7071L8.9639 4.6929C8.78 4.5092 8.6767 4.2598 8.6767 3.9998C8.6767 3.4585 9.1156 3.0198 9.6569 3.02L9.6569 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.1292 4.1292C2.8646 4.5128 2 5.6786 2 7L2 17C2 18.6569 3.3431 20 5 20L19 20C19.295 20 19.5885 19.9565 19.8708 19.8708M14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C9.7909 16 8 14.2091 8 12C8 10.9391 8.4214 9.9217 9.1716 9.1716M2 2L22 22"/>
    </svg>
  )
}
