import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointer({ size = 24, ...props }: IconProps) {
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
      <path d="M8.0719 1.044C9.4692 0.7791 10.7466 1.7465 10.9908 3.1045L11.6588 6.823L12.1715 6.7742L12.1734 6.7742C13.0528 6.6909 13.8542 7.0602 14.3815 7.6823C14.788 7.4468 15.2677 7.3271 15.7799 7.3757C16.7139 7.4645 17.4711 8.0955 17.7828 8.9391C18.0831 8.8354 18.4302 8.7931 18.8043 8.8727C19.3582 8.9907 19.8193 9.3415 20.1861 9.8199C20.4435 10.1557 20.6053 10.6055 20.7145 11.0278C20.8305 11.4769 20.9141 12.0053 20.9596 12.5766C21.0504 13.7184 20.9962 15.1012 20.7066 16.4797C20.1365 19.1939 18.5577 22.2203 15.0162 22.8925C14.9976 22.896 14.9784 22.8988 14.9596 22.9012C13.8062 23.0518 12.1112 23.1423 10.2545 22.2948C8.402 21.4492 6.5227 19.7321 4.8434 16.5373L3.3307 13.9721C2.7212 12.9381 2.9704 11.5795 3.9449 10.8531C4.8696 10.164 6.1417 10.279 6.9352 11.1069L7.3766 11.5679L6.0621 4.0233C5.8261 2.6686 6.682 1.3078 8.0719 1.044Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.8379 7.9076L11.5179 11.6923M14.1648 10.1834L14.4512 11.9756M17.1966 11.0129L17.4338 12.2503"/>
    </svg>
  )
}
