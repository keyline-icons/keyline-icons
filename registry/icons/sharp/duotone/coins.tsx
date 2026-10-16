import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Coins({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11.5C11 9.0675 14.3794 8 17 8C19.6206 8 23 9.0675 23 11.5L23 19.5C23 21.9325 19.6206 23 17 23C14.3794 23 11 21.9325 11 19.5L11 11.5Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 11.5C11 9.0675 14.3794 8 17 8C19.6206 8 23 9.0675 23 11.5L23 19.5C23 21.9325 19.6206 23 17 23C14.3794 23 11 21.9325 11 19.5L11 11.5ZM13 14C13.9443 14.6295 15.4262 15 17 15C18.5738 15 20.0557 14.6295 21 14L21 12C20.0557 12.6295 18.5738 13 17 13C15.4262 13 13.9443 12.6295 13 12ZM13 18C13.9443 18.6295 15.4262 19 17 19C18.5738 19 20.0557 18.6295 21 18L21 16C20.0557 16.6295 18.5738 17 17 17C15.4262 17 13.9443 16.6295 13 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 4.5C12 5.8807 9.7614 7 7 7C4.2386 7 2 5.8807 2 4.5C2 3.1193 4.2386 2 7 2C9.7614 2 12 3.1193 12 4.5ZM2 4.5L2 12.5C2 13.2504 2.6742 13.9612 3.8365 14.436C4.9987 14.9108 6.5261 15.0994 7.9968 14.9498L8.8956 14.8584M2 8.5C2 9.2523 2.6776 9.9647 3.8449 10.4394C5.0122 10.9142 6.545 11.1008 8.0182 10.9476L8.9148 10.8544" strokeOpacity="0.4"/>
    </svg>
  )
}
